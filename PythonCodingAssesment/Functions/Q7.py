# 7. Write a recursive function to solve the Tower of Hanoi problem.

def hanoi(n, source, destination, middle):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    hanoi(n-1, source, middle, destination)
    print(f"Move disk {n} from {source} to {destination}")
    hanoi(n-1, middle, destination, source)

hanoi(3, 'A', 'C', 'B')
