def replace_words_in_file(file_path, replacements):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            for old_word, new_word in replacements.items():
                content = content.replace(old_word, new_word)
        with open(file_path, 'w') as file:
            file.write(content)
        print("Replacements completed.")
    except FileNotFoundError:
        print("File not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

replacements = {
    "old": "new",
    "sample": "example"
}
replace_words_in_file("FileHandling/sample.txt", replacements)