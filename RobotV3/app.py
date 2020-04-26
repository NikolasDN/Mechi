from flask import Flask, render_template, Response
import numpy as np
import cv2
from gpiozero import LEDBoard

cap = cv2.VideoCapture(-1)

leds = LEDBoard(17, 18, 15, 27)
#my_message = "Started";

app = Flask(__name__)

def get_frame():
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret==True:
            #frame = cv2.flip(frame,0)
            return frame

@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')
@app.route("/switchlight/")
def switchlight():
    #Moving forward code
    #my_message = "Green!"
    print('Green!')
    leds[0].on()
    return "Nothing"
def gen():
    """Video streaming generator function."""
    while True:
            # write the flipped frame
            # out.write(frame)
        # while True:
        frame = get_frame()
        (flag, encodedImage) = cv2.imencode(".jpg", frame)
        if not flag:
            continue
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)