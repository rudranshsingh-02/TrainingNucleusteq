class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)
        print(f"Pushed: {item}")

    def pop(self):
        if self.is_empty():
            print("Stack is empty.")
            return None
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            print("Stack is empty.")
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        print("Stack (top to bottom):", self.items[::-1])


stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
stack.display()

print("Peek:", stack.peek())
print("Popped:", stack.pop())
stack.display()
