def compress_string(s):
    if not s:
        return ""

    result = ""
    count = 1

    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            result += s[i - 1] + str(count)
            count = 1  # reset count

    result += s[-1] + str(count) 
    return f"compressed string: {result}"

print(compress_string("aabbbcc"))