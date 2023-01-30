from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def process_bin_file():
  file = request.files.get('binFile')
  if file:
    # do something with the binary file
    # ...
    # return JSON response
    return jsonify({'message': 'File processed successfully'})
  else:
    return jsonify({'error': 'No file found'}), 400

if __name__ == '__main__':
  app.run()
