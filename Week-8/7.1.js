class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addToHead(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    reverse() {
        let current = this.head;
        let previous = null;
        let next = null;

        while (current) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this.head = previous;
    }

    print() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

let tempLinkedList = new LinkedList();
tempLinkedList.addToHead(6);
tempLinkedList.addToHead(5);
tempLinkedList.addToHead(4);
tempLinkedList.addToHead(3);
tempLinkedList.addToHead(2);
tempLinkedList.addToHead(1);
tempLinkedList.reverse();
tempLinkedList.print();

// time complexity is O(n) and space complexity is O(1)