from flask import Flask, render_template
import datetime

app = Flask(__name__)

@app.route('/')
def home():
    # Calculate age or days since birthday
    today = datetime.date.today()
    
    # You can customize this date to her actual birthday
    birthday = datetime.date(today.year, today.month, today.day)
    
    return render_template('index.html', 
                         name='Ana Luiza',
                         nickname='Amor',
                         nickname2='Bê',
                         today=today)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
