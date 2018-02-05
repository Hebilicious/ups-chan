const r = require("rethinkdbdash")()
const expect = require("chai").expect

describe("UPS-chan", function() {
  describe("Rethinkdb connection", function() {
    it("should be able to list databases using rethinkdbdash.", async function() {
      let list = await r.dbList().run()
      r.getPoolMaster().drain()
      // console.log(list)
      expect(list).to.have.lengthOf.above(1)
    })
  })
})
