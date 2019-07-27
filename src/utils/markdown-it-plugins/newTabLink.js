export default function newTabLink(md, opts) {
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const targetIndex = tokens[idx].attrIndex('target');

    if (targetIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      tokens[idx].attrs[targetIndex][1] = '_blank';    // replace value of existing attr
    }

    const classIndex = tokens[idx].attrIndex('class');

    if (classIndex < 0) {
      tokens[idx].attrPush(['class', 'msg-link']);
    } else {
      tokens[idx].attrs[classIndex][1] += ' msg-link';
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}
