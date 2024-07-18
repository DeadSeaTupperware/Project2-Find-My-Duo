function eq(value1, value2) {
  if (value1 === value2) {
    return true; // Return the block if the condition is true
  } else {
    return false; // Return the inverse block if the condition is false
  }
}

function eqParticipant(value1, value2) {
  for (let i = 0; i < value2.length; i++) {
    if (value1 === value2[i]) {
      return true; // Return true if value1 is found in value2
    }
  }
  return false; // Return false if value1 is not found in value2 after iterating through all elements
}
module.exports = { eq, eqParticipant };
