# 7. Create a queue using collections.deque and implement enqueue and dequeue.

from collections import deque

class Queue:
    def __init__(self):
        self.queue = deque()

    def enqueue(self, item):
        self.queue.append(item)
        print(f"Enqueued: {item}")

    def dequeue(self):
        if self.is_empty():
            print("Queue is empty. Cannot dequeue.")
            return None
        return self.queue.popleft()

    def peek(self):
        if self.is_empty():
            return None
        return self.queue[0]

    def is_empty(self):
        return len(self.queue) == 0

    def display(self):
        print("Queue:", list(self.queue))

q = Queue()
q.enqueue("apple")
q.enqueue("banana")
q.enqueue("cherry")
q.display()

print("Dequeued:", q.dequeue())
q.display()
print("Front element:", q.peek())
