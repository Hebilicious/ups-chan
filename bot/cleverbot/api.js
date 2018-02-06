/**
 * Created by Julian on 08.03.2017, modified by Hebilicious.
 */
import axios from "axios"
const baseUrl = "https://cleverbot.io/1.0"

/**
 * Creates a new Cleverbot instance
 * @class
 */
export class Cleverbot {
  /**
   * @param {string} key - The cleverbot.io api key
   * @param {string} user - The cleverbot.io user id
   * @param {string} [nick=upschan] - The session id, which should be used for this client.
   */
  constructor({ key, user, nick }) {
    if (!key) throw new Error("You need to provide an Api Key!")
    if (!user) throw new Error("You need to provide a User!")
    this.key = key
    this.user = user
    this.nick = nick ? nick : "upschan"
  }

  /**
   * Sets the session id
   * @param {string} nick - The session id to use
   */
  setNick(nick) {
    this.nick = nick
  }

  /**
   * Create a new Session
   * @return {Promise}
   */
  create() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${baseUrl}/create`,
          { user: this.user, key: this.key, nick: this.nick },
          { timeout: 60000 }
        )
        .then(res => {
          if (res.data.status === "success") {
            resolve()
          }
          if (res.data.status === "Error: reference name already exists") {
            resolve()
          }
          reject({
            error: "The api emitted an unknown response!",
            response: res.data.status
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Sends a question to the api
   * @param input - the input
   * @return {Promise}
   */
  ask(input) {
    return new Promise((resolve, reject) => {
      if (!input || input === "") {
        reject("You entered an empty input!")
      }
      axios
        .post(
          `${baseUrl}/ask`,
          { user: this.user, key: this.key, nick: this.nick, text: input },
          { timeout: 60000 }
        )
        .then(res => {
          if (res.data.status === "success") {
            resolve(res.data.response)
          }
          reject({
            error: "The api emitted an unknown response!",
            response: res.data.status
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
