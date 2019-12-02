const NodeType = {
  program: "program",
  number: "number",
  binaryOperator: "binaryOperator"
};
class Node {
  constructor(type, left, right, op) {
    this.type = type;
    switch (type) {
      case NodeType.number:
        this.value = left;
        break;
      case NodeType.binaryOperator:
        this.left = left;
        this.right = right;
        this.op = op;
        break;
      case NodeType.program:
        this.expr = null;
        break;
      default:
        throw new Error(`unexpected node type ${type}`);
    }
  }
}

const calc = str => {
  let i = 0,
    c = "",
    tokens = [];
  str = str.replace(/\s+/g, "");
  while (str[i] !== undefined) {
    switch (str[i]) {
      case "+":
      case "-":
      case "x":
      case "/":
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

  i = 0;
  const parse = () => {
    const consume = token => {
      console.log(
        `consume ${token}, ${tokens[i]} at ${i} : ${token === tokens[i]}`
      );
      if (token === tokens[i]) {
        i++;
        return true;
      }
      return false;
    };
    const expr = () => {
      return add();
    };
    const mul = () => {
      console.log(`mul: ${tokens[i]}, ${i}`);
      let node = num();
      while (true) {
        if (consume("x")) {
          node = new Node(NodeType.binaryOperator, node, num(), "x");
        } else if (consume("/")) {
          node = new Node(NodeType.binaryOperator, node, num(), "/");
        } else {
          return node;
        }
      }
    };

    const add = () => {
      console.log(`add: ${tokens[i]}, ${i}`);
      let node = mul();
      while (true) {
        console.log(i);
        if (consume("+")) {
          node = new Node(NodeType.binaryOperator, node, mul(), "+");
        } else if (consume("-")) {
          node = new Node(NodeType.binaryOperator, node, mul(), "-");
        } else {
          return node;
        }
      }
    };
    const num = () => {
      const token = tokens[i++];
      assertType(token, NodeType.number);
      return new Node(NodeType.number, token);
    };

    return expr();
  };
  const ast = parse();
  console.log(str, ast);
  const evaluate = node => {
    switch (node.type) {
      case NodeType.program:
        return evaluate(node.expr);
      case NodeType.number:
        return node.value;
      case NodeType.binaryOperator: {
        switch (node.op) {
          case "+":
            return evaluate(node.left) + evaluate(node.right);
          case "x":
            return evaluate(node.left) * evaluate(node.right);
          case "/":
            return evaluate(node.left) / evaluate(node.right);
          case "-":
            return evaluate(node.left) - evaluate(node.right);
        }
      }
    }
  };
  return evaluate(ast);
};

module.exports = calc;
