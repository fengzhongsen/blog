// 节点
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// 二叉查找树
class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  // 插入节点
  insert(data) {
    const node = new Node(data);
    if (this.root == null) {
      this.root = node;
    } else {
      let current = this.root;
      let parent;
      while (true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current == null) {
            parent.left = node;
            break;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }

  // 删除节点
  remove(data) {
    // 获取最小值节点
    const getMinNode = (node) => {
      let current = node;
      while (current.left != null) {
        current = current.left;
      }
      return current;
    }

    // 删除节点
    const removeNode = (node, data) => {
      if (node == null) {
        return null;
      }
      if (data === node.data) {
        // 1、没有子节点的节点
        if (node.left == null && node.right == null) {
          return null;
        }
        // 2、 没有左子节点的节点
        else if (node.left == null) {
          return node.right;
        }
        // 3、 没有右子节点的节点
        else if (node.right == null) {
          return node.left;
        }
        // 4、 有两个子节点的节点
        else {
          const rigthMinNode = getMinNode(node.right);
          node.data = rigthMinNode.data;
          node.right = removeNode(node.right, rigthMinNode.data);
          return node;
        }
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }

    this.root = removeNode(this.root, data);

    return this;
  }

  // 先序遍历
  preOrder() {
    const result = [];
    const order = (node) => {
      if (node != null) {
        result.push(node.data);
        order(node.left);
        order(node.right);
      }
    }
    order(this.root);
    return result;
  }

  // 中序遍历
  inOrder() {
    const result = [];
    const order = (node) => {
      if (node != null) {
        order(node.left);
        result.push(node.data);
        order(node.right);
      }
    }
    order(this.root);
    return result;
  }

  // 后序遍历
  postOrder() {
    const result = [];
    const order = (node) => {
      if (node != null) {
        order(node.left);
        order(node.right);
        result.push(node.data);
      }
    }
    order(this.root);
    return result;
  }

  // 层次遍历
  storeyOrder() {
    const result = [];
    const order = (node) => {
      const queue = [];
      queue.push(node);
      while (queue.length) {
        node = queue.shift();
        result.push(node.data);
        if (node.left != null) {
          queue.push(node.left);
        }
        if (node.right != null) {
          queue.push(node.right);
        }
      }
    }
    order(this.root);
    return result;
  }

  // 打印树
  print() {
    // 一、获取树的高度
    const getHeight = (node = this.root) => {
      if (node == null) return 0;
      var left = getHeight(node.left);
      var right = getHeight(node.right);
      return Math.max(left, right) + 1;
    }

    // 二、补全二叉树
    const fullNode = (node, height) => {
      if (--height <= 0) {
        return;
      }
      if (node.left == null) {
        node.left = new Node(null);
      }
      if (node.right == null) {
        node.right = new Node(null);
      }
      fullNode(node.left, height);
      fullNode(node.right, height);
    }

    // 三、准备数据结构
    const format = () => {
      const rows = [];
      let row = [];
      let last = this.root;
      let nlast = null;
      let temp = null;
      let queue = [];
      queue.push(last);
      while (queue.length) {
        temp = queue.shift();
        row.push(temp);
        const { left, right } = temp;
        if (left != null) {
          queue.push(left);
          nlast = left;
        }
        if (right != null) {
          queue.push(right);
          nlast = right;
        }
        if (temp == last) {
          last = nlast;
          rows.push(row);
          row = [];
        }
      }
      return rows;
    }

    // 四、打印
    const print = (height) => {
      const rows = format();
      const totalCols = 2 ** height + 1; // 最多打印列数
      for (let i = 0, len = rows.length; i < len; i++) {
        const n = i + 1; // 当前是第n层
        const row = rows[i]; // 层次
        const nodesNum = 2 ** (n - 1); // 当前层节点数
        const spaceNum = 2 ** (height - n); // 两边空格数
        const nodeSpaceNum = n === 1 // 节点间空格数
          ? 0
          : ((totalCols - 2 * spaceNum - nodesNum) / (nodesNum - 1));

        let sideSpace = ''; // 左右两边空白
        let spanSpace = ''; // 两节点之间的空白

        for (let l = 0; l < spaceNum; l++) {
          sideSpace += '\t';
        }

        for (let s = 0; s < nodeSpaceNum; s++) {
          spanSpace += '\t';
        }

        let nodeMiddleStr = '';
        let branceMiddleStr = '';
        // 打印节点
        row.forEach((node, index) => {
          let nodeStr = ''; // 节点
          let branchStr = ''; // 树枝，即 / 和 \

          const { data, left, right } = node;
          if (data == null) {
            nodeStr = '\t';
            branchStr = '\t';
          } else {
            nodeStr = String(data).padStart(3, ' ');
            if (left) {
              branchStr += (left.data ? '/' : right ? '' : '\t');
            }
            branchStr += '\t';
            if (right) {
              branchStr += (right.data ? '\\' : '');
            }
          }

          nodeMiddleStr += nodeStr;
          branceMiddleStr += branchStr;
          if (index + 1 < nodesNum) {
            nodeMiddleStr += spanSpace;
            branceMiddleStr += spanSpace;
          }
        })

        console.log(`${sideSpace}${nodeMiddleStr}`);
        console.log(`${sideSpace}${branceMiddleStr}`);
      }
    }

    const height = getHeight();
    fullNode(this.root, height);
    print(height);
  }
}

// 测试用例
(() => {
  const tree = new BinarySearchTree();
  const nodes = [23, 45, 16, 37, 3, 99, 22];
  nodes.forEach(node => tree.insert(node));

  console.log('1.1 依次插入以下节点:', nodes);

  console.log('1.2 初始二叉树:');
  tree.print();

  console.log('2.1 先序遍历:', tree.preOrder());

  console.log('2.2 中序遍历:', tree.inOrder());

  console.log('2.3 后序遍历:', tree.postOrder());

  console.log('2.4 层次遍历:', tree.storeyOrder());

  console.log('3.1 删除节点3:');
  tree.remove(3).print();

  console.log('3.2 删除节点16:');
  tree.remove(16).print();

  console.log('3.3 删除节点45:');
  tree.remove(45).print();
})();

