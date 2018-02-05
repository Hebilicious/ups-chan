const fs = require("fs")

const expect = require("chai").expect

import { GifGenerator } from "../bot/spoiler/gifgenerator.js"
import { set } from "lodash"

const spoiler = {
  topic: "topic",
  message: {},
  content: "content"
}
const g = new GifGenerator()

describe("UPS-chan", function() {
  describe("Spoiler Feature", function() {
    it("should make and delete a gif from a spoiler correctly.", function(done) {
      set(spoiler, "message.member.displayName", "Johnson")
      set(spoiler, "message.id", 1)
      g.createSpoilerGif(spoiler, 30, function(filePath) {
        // console.log(filePath)
        expect(fs.existsSync(filePath)).to.be.true
        fs.unlink(
          filePath,
          err => (err ? console.error(`Could not remove GIF: ${err}`) : null)
        )
        done()
      })
    })
  })
})
