const calc = (str) => {
  let i = 0, c = "", tokens = [];
  str = str.replace(/\s+/g, "");
  while(str[i] !== undefined) {
    switch(str[i]) {
      case '+':
      case '-':
      case 'x':
      case '/':
        tokens.push(Number(c));
        tokens.push(str[i]);
        c = "";
        break;
      default:
        c += str[i];
        break;
    }
    i++;
  }
  tokens.push(Number(c));
  console.log("tokens: ", tokens);

  i = 1;
  let acc = tokens[0];
  while(tokens[i] !== undefined) {
    switch(tokens[i]) {
      case '+':
        acc += tokens[i + 1];
        i++;
        break;
      case '-':
        acc -= tokens[i + 1];
        i++;
        break;
      case 'x':
        acc *= tokens[i + 1];
        i++;
        break;
      case '/':
        acc /= tokens[i + 1];
        i++;
        break;
      default:
        console.log(tokens[i]);
        throw new Error("unexpected operator");
        break;
    }

    i++;
  }
  return acc;
}

module.exports = calc
