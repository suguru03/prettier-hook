import { Ast, hooks } from '../../';

function parse(ast) {
  new Ast().set('VariableDeclaration', resolve).resolveAst(ast);
  // modify AST
  return ast;
}

hooks.babylon.addHook(parse);

function resolve(node, key) {
  let variableDeclarator: any;
  const bool = new Ast()
    .set('VariableDeclarator', (node, key, ast) => {
      if (!ast.resolveAst(node[key], 'init')) {
        return false;
      }
      variableDeclarator = node[key];
      return true;
    })
    .set(
      'Identifier',
      (node, key, ast) =>
        node[key].name === 'require' || ast.resolveAst(node, key),
    )
    .resolveAst(node);
  if (!bool || !variableDeclarator) {
    return false;
  }
  node.splice(key, 1, {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportNamespaceSpecifier',
        local: variableDeclarator.id,
      },
    ],
    importKind: 'value',
    source: variableDeclarator.init.arguments[0],
  });
  return true;
}
