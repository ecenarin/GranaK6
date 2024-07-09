import json

input_file = '/Users/skup/xk6-project/test-results.json'
output_file = '/Users/skup/Downloads/GrafanaK6/cleaned-test-results.json'

with open(input_file) as f:
    data = []
    for line in f:
        data.append(json.loads(line))

# Assuming the data is an array of objects, wrap it in a single object
cleaned_data = {
    "results": data
}

with open(output_file, 'w') as f:
    json.dump(cleaned_data, f, indent=2)

print(f"Cleaned data saved to {output_file}")
