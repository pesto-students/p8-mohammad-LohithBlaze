class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    addToTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    leftShift(k) {
        if (k <= 0 || k >= this.size) return;
        let current = this.head;
        let previous = null;
        for (let i = 0; i < k; i++) {
            previous = current;
            current = current.next;
        }
        previous.next = null;
        let tail = current;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = this.head;
        this.head = current;
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
tempLinkedList.addToTail(1);
tempLinkedList.addToTail(2);
tempLinkedList.addToTail(3);
tempLinkedList.addToTail(4);
tempLinkedList.addToTail(5);
tempLinkedList.addToTail(6);
tempLinkedList.leftShift(3);
tempLinkedList.print();

// time complexity is O(n) and space complexity is O(1)