// Proof of Concept;

interface Component {
  type: string;
  style?: Style;
};

type Style = string | string[] | any;

interface Builder extends Selectors, DeepSelection {
  apply: (style: Style) => Component;
}

export interface Selectors {
  all: () => Builder;
  allOfType: (c: Component) => Builder;
  first: () => Builder;
  firstOfType: (c: Component) => Builder;
  last: () => Builder;
  lastOfType: (c: Component) => Builder;
  nth: (n: number) => Builder;
  nthOfType: (n: number, c: Component) => Builder;
  not: (c: Component) => Builder;
}

export interface DeepSelection {
  depth: (d: number) => Builder;
  recursive: () => Builder;
}


class StyledChildrenBuilder implements Builder {

  // ?
  constructor() { };

  all() {
    return this;
  }

  allOfType(c: Component) {
    return this;
  }
  first() {
    return this;
  }
  firstOfType(c: Component) {
    return this;
  }
  last() {
    return this;
  }
  lastOfType(c: Component) {
    return this;
  }
  nth(n: number) {
    return this;
  }
  nthOfType(n: number, c: Component) {
    return this;
  }
  not(c: Component) {
    return this;
  }

  depth(d: number) {
    return this;
  }

  recursive() {
    return this;
  }

  apply(s: Style) {
    return {
      type: 'component',
      style: s
    }
  }
}



const styledChildren = new StyledChildrenBuilder();
const View = {
  type: 'View'
}

const MarginedChildren = styledChildren.all().apply({ margin: 0 });