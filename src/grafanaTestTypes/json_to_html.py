import json
import sys
from jinja2 import Template

if len(sys.argv) != 3:
    print("Usage: python json_to_html.py <input.json> <output.html>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file) as f:
    data = json.load(f)

template = Template('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>k6 Test Report</title>
</head>
<body>
    <h1>k6 Test Report</h1>
    <h2>Summary</h2>
    <p>Total requests: {{ results | length }}</p>
    <p>Duration: {{ results[0]['duration'] }}</p>

    <h2>Details</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Metric</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {% for metric in results %}
            <tr>
                <td>{{ metric['metric'] }}</td>
                <td>{{ metric['value'] }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</body>
</html>
''')

with open(output_file, 'w') as f:
    f.write(template.render(results=data['results']))

print(f"Report saved to {output_file}")
