def read_file_safely(file_path):
    try:
        file = open(file_path, 'r')
        content = file.read()
        print(content)
    except FileNotFoundError:
        print("File not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        try:
            file.close()
            print("File closed.")
        except:
            pass

read_file_safely("FileHandling/sample.txt")
