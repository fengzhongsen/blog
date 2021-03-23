/**
 * 记录类别枚举
 */
enum RecordType {
  Default,
  FontEnd,
  BackEnd,
  DataBase,
  Network,
  Tools,
}

/**
 * 记录标签枚举
 * [a][b][c][d][e]
 * a - 一级分类
 * b - 二级分类
 * cde - 序号
 */
enum RecordTag {
  Default = 0,

  // 前端相关
  HTML = 10001,
  CSS,
  JavaScript,
  Vue,
  React,
  Angular,

  babel = 11001,
  webpack,
  gulp,

  // 服务端相关
  Node = 20001,
  Java,
  Go,
  Python,
  C,

  // 数据库
  MySql = 30001,
  Mongo,

  // 网络
  Http = 40001,

  // 工具
  Git = 50001,
  Nginx,
  Docker,

  VSCode = 51001,
  Vim,
}

/**
 * 记录
 */
interface RecordItem {
  name: string;
  desc: string;
  link: string;
  type: RecordType;
  tags: RecordType[];
}

class RecordCategory {
  name: string;
  desc: string;
  children: RecordItem[];

  constructor(cate: RecordCategory) {
    this.name = cate.name;
    this.desc = cate.desc;
    this.children = cate.children;
  }

  find(cate) {

  }

  create(cate) {

  }

  update(cate) {

  }

  delete(id) {

  }
}

var guide = {
  vue: {
    name: 'VUE',

  }
}