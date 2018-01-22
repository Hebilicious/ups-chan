function randomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)]
}

export function getRandomDontSpoilMessage() {
  const messages = [
    "Spoiler are the path to the dark side.",
    "For the night is long, and full of spoilers.",
    "This is 10% luck, 20 % skill, 5% pleasure, 50% pain And 100% spoiler. Or not.",
    "Dumbledore is dead.",
    "I AM your father!",
    "No spoiler here.",
    "Another day at the job son. No spoiler.",
    "You shall not spoil !",
    "If I live, spoiler shall die!",
    "Get down !!!",
    "I'll protect you from the spoils <3"
  ]
  return randomMessage(messages)
}

export function getRandomLossMessage() {
  const messages = [
    "GG, we got zerged.",
    "NextTime 4sure.",
    "Bad round.",
    "Can we redo, I had to scratch my nose?",
    "Unlucky I guess.",
    "GG boys... See you next week...",
    "Just numbers."
  ]
  return randomMessage(messages)
}

export function getRandomWinMessage() {
  const messages = [
    "Congratulations to @everyone for this insane win !!!",
    "GG. I hope I was more funny and clever.",
    "GG Germany won, once again ...",
    "GG, Welcome to Alustin.",
    "Croxus got defeated once again! GG.",
    "GG, big thanks to JLN, once again.",
    "GG EZ sniped node EZ",
    "GG boys! See you next week."
  ]
  return randomMessage(messages)
}

export function getRandomOkMessage() {
  const messages = [
    "As you wish.",
    "Your will, my hands.",
    "Your wishes, my commands.",
    "At your service.",
    "Of course master.",
    "I obey.",
    "I'm yours to command.",
    "Anything to please you my lord.",
    "Yes please daddy.",
    "Oh yeah, that's the spot baby...",
    "I heard lib is a woman, is that true ?? Uh I'm sorry that's the wrong message !! I meant : Yes master.",
    "Without hesitation.",
    "Yes master.",
    "Right away sir.",
    "Sir, yes sir.",
    "Rush b cyka blyat.. *enables english* Yes mylord.",
    "Gladly",
    "Whatever you say.",
    "It's not like i wanted to do that >_<",
    "I would have you right now on this table until you beg for mercy twice."
  ]
  return randomMessage(messages)
}
