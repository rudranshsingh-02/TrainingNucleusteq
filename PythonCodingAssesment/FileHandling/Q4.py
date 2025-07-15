def append_input(path):
    try:
        user_input = input("Enter text to append to the file: ")
        with open(path, 'a') as file:
            file.write(user_input + '\n')
            print(f"Text appended to '{path}' successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
path = "PythonModules/glob.txt"
append_input(path)