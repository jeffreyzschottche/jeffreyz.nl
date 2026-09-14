import AppKit

// Extract the supplied 4 × 3 storyboard without redrawing its artwork.
guard CommandLine.arguments.count == 3,
      let source = NSImage(contentsOfFile: CommandLine.arguments[1]),
      let image = source.cgImage(forProposedRect: nil, context: nil, hints: nil)
else { fatalError("Usage: swift scripts/extract-doodle.swift source.png destination.png") }

let width = 318, height = 330
let columns = [23, 377, 731, 1086]
let rows = [11, 371, 729]
let colorSpace = CGColorSpaceCreateDeviceRGB()
let canvas = CGContext(data: nil, width: width * 12, height: height,
                       bitsPerComponent: 8, bytesPerRow: 0, space: colorSpace,
                       bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
canvas.setFillColor(CGColor(gray: 1, alpha: 1))
canvas.fill(CGRect(x: 0, y: 0, width: width * 12, height: height))
for index in 0..<12 {
    let crop = CGRect(x: columns[index % 4] + 10, y: rows[index / 4] + 7,
                      width: width, height: height)
    guard let frame = image.cropping(to: crop) else { fatalError("Invalid frame") }
    canvas.draw(frame, in: CGRect(x: index * width, y: 0, width: width, height: height))
    // Frame numbers occupy empty space above and to the left of the character.
    canvas.fill(CGRect(x: index * width, y: height - 49, width: 40, height: 49))
}
let bitmap = NSBitmapImageRep(cgImage: canvas.makeImage()!)
try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: CommandLine.arguments[2]))
