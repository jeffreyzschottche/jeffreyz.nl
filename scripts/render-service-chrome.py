"""Render the original chrome objects used in the Swiss service cards.

Run with Blender in background mode, passing --output-dir after --.
The transparent PNG renders can be converted to grayscale WebP for the site.
"""
import argparse
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

parser = argparse.ArgumentParser()
parser.add_argument('--output-dir', default='/tmp/swiss-grid-assets/chrome')
parser.add_argument('--samples', type=int, default=48)
options = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
output = Path(options.output_dir)
output.mkdir(parents=True, exist_ok=True)


def material(name, value, metallic=1, roughness=.13):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (value, value, value, 1)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value = (value, value, value, 1)
    shader.inputs['Metallic'].default_value = metallic
    shader.inputs['Roughness'].default_value = roughness
    return mat


def point_at(obj, position):
    obj.rotation_euler = (Vector(position) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def studio():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = options.samples
    scene.cycles.use_denoising = True
    scene.render.resolution_x = 1000
    scene.render.resolution_y = 1000
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.view_settings.view_transform = 'AgX'
    world = bpy.data.worlds.new('Neutral studio')
    scene.world = world
    world.use_nodes = True
    world.node_tree.nodes.get('Background').inputs[0].default_value = (.24, .24, .24, 1)
    world.node_tree.nodes.get('Background').inputs[1].default_value = .7
    for name, location, energy, size, size_y in [
        ('Tall left softbox', (-4, -3, 5), 1800, 2.0, 7),
        ('Right strip', (4, -1, 3), 1400, 1.2, 6),
        ('Overhead', (0, 2, 6), 2200, 5, 3),
        ('Front reflection', (-1, -6, 1), 800, 4, 2),
    ]:
        data = bpy.data.lights.new(name, 'AREA')
        data.energy = energy
        data.shape = 'RECTANGLE'
        data.size = size
        data.size_y = size_y
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        obj.location = location
        point_at(obj, (0, 0, 0))
    # White and black studio cards produce broad, curved chrome reflections.
    for location, scale, value in [
        ((-4, 1, 0), (2, 4, 1), .92),
        ((4, 2, 0), (1.5, 5, 1), .025),
        ((0, 4, 2), (4, 3, 1), .95),
        ((2, -4, 0), (1, 3, 1), .015),
    ]:
        bpy.ops.mesh.primitive_plane_add(size=2, location=location)
        panel = bpy.context.object
        point_at(panel, (0, 0, 0))
        panel.scale = scale
        panel.data.materials.append(material('Reflection card', value, 0, .5))
        panel.visible_camera = False
    data = bpy.data.cameras.new('Camera')
    camera = bpy.data.objects.new('Camera', data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    data.type = 'ORTHO'
    return scene, camera, material('Polished silver chrome', .8)


def finish(obj, mat, bevel=0):
    obj.data.materials.append(mat)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    if bevel:
        mod = obj.modifiers.new('Machined edge', 'BEVEL')
        mod.width = bevel
        mod.segments = 4
        normal = obj.modifiers.new('Face normals', 'WEIGHTED_NORMAL')
        normal.keep_sharp = True
    return obj


def render(scene, camera, filename, position, target, scale):
    camera.location = position
    point_at(camera, target)
    camera.data.ortho_scale = scale
    scene.render.filepath = str(output / filename)
    bpy.ops.render.render(write_still=True)


def gear():
    scene, camera, chrome = studio()
    teeth = 14
    radial_steps = [1.60, 1.60, 1.88, 1.92, 1.92, 1.88, 1.60, 1.60]
    n = teeth * len(radial_steps)
    vertices = []
    for z, inner in [(-.20, False), (.20, False), (-.20, True), (.20, True)]:
        for i in range(n):
            angle = 2 * math.pi * i / n
            radius = .53 if inner else radial_steps[i % len(radial_steps)]
            vertices.append((radius * math.cos(angle), radius * math.sin(angle), z))
    faces = []
    for i in range(n):
        j = (i + 1) % n
        faces.extend([(i,j,n+j,n+i), (n+i,n+j,3*n+j,3*n+i),
                      (2*n+i,3*n+i,3*n+j,2*n+j), (i,2*n+i,2*n+j,j)])
    mesh = bpy.data.meshes.new('Fourteen tooth gear')
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new('Machined chrome gear', mesh)
    scene.collection.objects.link(obj)
    finish(obj, chrome, .055)
    # Raised concentric collar makes the central bore clearly visible.
    for radius, tube in [(.67, .095), (1.30, .018)]:
        bpy.ops.mesh.primitive_torus_add(major_segments=128, minor_segments=16,
            major_radius=radius, minor_radius=tube, location=(0,0,.205))
        finish(bpy.context.object, chrome)
    render(scene,camera,'chrome-gear.png',(2.1,-3.2,6.5),(0,0,0),4.5)


def sphere():
    scene, camera, chrome = studio()
    bpy.ops.mesh.primitive_uv_sphere_add(segments=128,ring_count=64,radius=1.65)
    finish(bpy.context.object,chrome)
    render(scene,camera,'chrome-sphere.png',(0,-6,2.2),(0,0,0),3.7)


def lotus():
    scene, camera, chrome = studio()
    # Each pointed petal is a closed, gently cupped metal surface.
    for ring, count, length, height, width, offset in [
        (0,7,2.0,.52,.59,0), (1,7,1.53,1.18,.54,math.pi/7),
        (2,5,.93,1.68,.43,.15),
    ]:
        for petal in range(count):
            angle = petal*2*math.pi/count + offset
            segments, sides = 40, 32
            vertices, faces = [], []
            for i in range(segments+1):
                u = i/segments
                profile = max(.003,math.sin(math.pi*u)**.85)
                radius = .12 + length*u
                z = -.38 + ring*.07 + height*u**1.65
                for j in range(sides):
                    v = j*2*math.pi/sides
                    across = width*profile*math.cos(v)
                    thickness = .105*profile*math.sin(v)
                    cup = .20*profile*math.cos(v)**2
                    vertices.append((radius*math.cos(angle)-across*math.sin(angle),
                                     radius*math.sin(angle)+across*math.cos(angle), z+thickness+cup))
            for i in range(segments):
                for j in range(sides):
                    a=i*sides+j; b=i*sides+(j+1)%sides
                    faces.append((a,b,b+sides,a+sides))
            faces.append(tuple(reversed(range(sides))))
            faces.append(tuple(segments*sides+j for j in range(sides)))
            mesh=bpy.data.meshes.new('Cupped lotus petal')
            mesh.from_pydata(vertices,[],faces)
            mesh.update()
            obj=bpy.data.objects.new(f'Lotus ring {ring+1} petal {petal+1}',mesh)
            scene.collection.objects.link(obj)
            finish(obj,chrome)
    render(scene,camera,'chrome-lotus.png',(3,-6,3.8),(0,0,.35),4.65)


gear()
sphere()
lotus()
