
const importTempReg = /\/\* append lazy loader template \*\//g;
const importReg = /import (\S*) from ('|")lazy!(\S*)('|")/g;

const callbackId = '__lazy_callback__';
const lazyLoaderTemp = `
window.__lazy_callback__ = function (lazyModule) {
  return class extends React.Component {
    state = {
      component: null,
    }
    componentWillMount() {
      lazyModule((module) => {
        if (typeof module.default === 'function') {
          this.setState({
            component: module.default,
          });
        } else {
          this.setState({
            component: module,
          });
        }
      });
    }
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : <div />;
    }
  };
}
`;
let insertTemp = false;
module.exports = (content) => {
  if(!insertTemp){
    insertTemp = true;
    content = lazyLoaderTemp+'\n'+ content;
  }
  try {
    content = content.split('\n').map((line) => {
      if (importTempReg.test(line)) {
        line += lazyLoaderTemp;
        return line;
      }
      return line.replace(importReg, (str, name, a, url) => {
        let chunkName = url;
        if (chunkName.startsWith('./')) {
          chunkName = chunkName.replace('./', '');
        }
        if (chunkName.endsWith('/')) {
          chunkName += 'index';
        }
        return `const ${name} = ${callbackId}(cb => import(/* webpackChunkName: "${chunkName}" */ '${url}').then(cb))`;
      });
    });
    content = content.join('\n');
  } catch (error) {
    console.error(error);
  }
  return content;
};

