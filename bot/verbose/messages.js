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
    'Gladly',
    'Whatever you say.',
    "It's not like i wanted to do that >_<",
    "I would have you right now on this table until you beg for mercy twice."
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}
