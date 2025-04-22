# read words.txt file line by line and convert it to a list of words in JSON format

import json
import os

def convert_words_to_json(input_file, output_file):
    """
    Convert words.txt file to JSON format.
    
    Args:
        input_file (str): Path to the input words.txt file.
        output_file (str): Path to the output JSON file.
    """
    if not os.path.exists(input_file):
        raise FileNotFoundError(f"The input file {input_file} does not exist.")
    
    words = []
    
    with open(input_file, 'r') as file:
        for line in file:
            word = line.strip()
            if word:  # Check if the line is not empty
                words.append(word)
    
    with open(output_file, 'w') as json_file:
        json.dump(words, json_file, indent=4)

if __name__ == "__main__":
    input_file = 'words.txt'  # Path to the input words.txt file
    output_file = 'words_big.json'  # Path to the output JSON file
    
    convert_words_to_json(input_file, output_file)
    print(f"Converted {input_file} to {output_file}.")