import Plugin from './Plugin';

export default function ({ types }) {
  let plugins = null;

  // 将插件作用到节点上
  function applyInstance(method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context]);
      }
    }
  }

  const Program = {
    // ast 入口
    enter(path, { opts = {} }) {
      // 初始化插件实例
      if (!plugins) {
        plugins = [
          new Plugin(
            opts.libraryName,
            opts.libraryDirectory,
            opts.style,
            types,
          ),
        ];
      }
      applyInstance('ProgramEnter', arguments, this);
    },
    // ast 出口
    exit() {
      applyInstance('ProgramExit', arguments, this);
    },
  };

  const ret = {
    visitor: { Program },
  };

  // 插件只作用在 ImportDeclaration 和 CallExpression 上
  ['ImportDeclaration', 'CallExpression'].forEach(method => {
    ret.visitor[method] = function () {
      applyInstance(method, arguments, ret.visitor);
    };
  });

  return ret;
}
