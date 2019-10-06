import Vue from 'vue';

class Path {
  constructor(route) {
    this.list = route.path.split('/').splice(1);
    this.branch = this.computeBranch();
    this.name = this.computeName();
    this.depth = this.list.length;
    this.path = route.path.toLowerCase();
  }

  computeBranch() {
    if (this.list[0] == '') return 0;
    return parseInt(this.list[0].slice(0, 2));
  }

  computeName() {
    if (this.list[0] == '') return 'Home';
    let idx = this.list.length > 1 ? this.list.length - 1 : 0;
    return this.list[idx].split('-').splice(1).join(' ');
  }
}

class Paths {
  constructor(router) {
    this.router = router;
    this.list = this.computePaths();
  }

  computePaths() {
    let routes = this.router.options.routes;
    let excludes = i => i.includes('/@');
    let cleaned = routes.filter(i => !excludes(i.path)).
      map(i => new Path(i)).
      sort((a, b) => a.branch - b.branch);
    let sorted = [];
    let branches = [...new Set(cleaned.map(i => i.branch))].length;
    for (let i = 1; i <= branches; i++) {
      let family = cleaned.filter(route => route.branch == i);
      family.forEach(el => {
        el['parent'] = el.depth > 1 ? family[0] : cleaned[0];
        sorted.push(el);
      });
    }
    cleaned[0]['parent'] = null;
    return [cleaned[0], ...sorted];
  }

  getCategories() {
    return this.list.filter(i => i.depth == 1);
  }

  getPath(path) {
    return this.list.find(i => i.path == path);
  }

}

Vue.prototype.$Paths = (router) => new Paths(router);
