import AppKit

struct Sprite: Decodable {
    let file: String
    let width: Int
    let height: Int
    let anchorX: Double
    let anchorY: Double
}
struct Atlas: Decodable {
    let cellWidth: Double
    let cellHeight: Double
    let sprites: [Sprite]
}
struct Animation: Decodable {
    let width: Int
    let height: Int
    let fps: Int
    let duration: Double
    let atlases: [String: Atlas]
}
let source = CommandLine.arguments[1]
let manifest = try JSONDecoder().decode(Animation.self, from: Data(contentsOf: URL(fileURLWithPath: source + "/animation.json")))
func load(_ file: String) -> CGImage {
    guard let image = NSImage(contentsOfFile: file), let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else { fatalError("Could not load \(file)") }
    return cg
}
let background = load(source + "/background.png")
let images = manifest.atlases.mapValues { atlas in atlas.sprites.map { load(source + "/" + $0.file) } }
let walk = manifest.atlases["walk"]!
let medianHeight = walk.sprites.map { Double($0.height) }.sorted()[walk.sprites.count / 2]
let walkScale = 96.0 / medianHeight
let climbScale = walkScale * walk.cellWidth / manifest.atlases["climb"]!.cellWidth
let ledgeScale = walkScale * walk.cellWidth / manifest.atlases["ledge"]!.cellWidth

for frame in 0..<Int(manifest.duration * Double(manifest.fps)) {
    let context = CGContext(data: nil, width: manifest.width, height: manifest.height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    context.interpolationQuality = .high
    context.draw(background, in: CGRect(x: 0, y: 0, width: manifest.width, height: manifest.height))
    func draw(_ atlas: String, _ index: Int, x: Double, y: Double, scale: Double, floor: Bool = false, mirror: Bool = false, rim: Bool = false) {
        let sprite = manifest.atlases[atlas]!.sprites[index]
        let image = images[atlas]![index]
        let width = Double(sprite.width) * scale
        let height = Double(sprite.height) * scale
        let left = floor ? x - width / 2 : x - sprite.anchorX * scale
        let top = floor ? y - height : y - sprite.anchorY * scale
        context.saveGState()
        if rim {
            context.setShadow(offset: .zero, blur: 0.9, color: CGColor(red: 1, green: 0.78, blue: 0.17, alpha: 0.95))
        }
        // Quartz uses a bottom-left origin; scene positions use top-left pixels.
        if mirror {
            context.translateBy(x: x * 2, y: 0)
            context.scaleBy(x: -1, y: 1)
        }
        context.draw(image, in: CGRect(x: left, y: Double(manifest.height) - top - height, width: width, height: height))
        context.restoreGState()
    }
    let time = Double(frame) / Double(manifest.fps)
    if time < 2.8 {
        let progress = time / 2.8
        draw("walk", Int(time * 8) % 8, x: 258 - progress * 67, y: 294, scale: walkScale, floor: true)
    } else if time < 4.3 {
        let index = min(3, Int((time - 2.8) / 0.375))
        let positions: [(Double, Double)] = [(185,274), (162,286), (143,329), (143,335)]
        draw("ledge", index, x: positions[index].0, y: positions[index].1, scale: ledgeScale, mirror: index == 1, rim: index > 0)
    } else if time < 8.5 {
        let progress = (time - 4.3) / 4.2
        let cycle = [0, 1, 5, 4, 6, 7, 3, 2]
        context.saveGState()
        context.clip(to: CGRect(x: 0, y: manifest.height - 433, width: manifest.width, height: 433))
        draw("climb", cycle[Int((time - 4.3) * 8) % 8], x: 143, y: 335 + progress * 160, scale: climbScale, rim: true)
        context.restoreGState()
    }
    let bitmap = NSBitmapImageRep(cgImage: context.makeImage()!)
    let file = String(format: "%@/rendered/%03d.png", source, frame)
    try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: file))
}
print("Rendered \(Int(manifest.duration * Double(manifest.fps))) frames from the generated sprite artwork.")
