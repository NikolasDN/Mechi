using System;
using System.Threading.Tasks;
using OpenCvSharp;

namespace Robot
{
    public class Seeer
    {
        static VideoCapture _capture;
        public async static Task HandleCapture()
        {
            if (_capture == null)
            {
                try
                {
                    _capture = new VideoCapture();
                }
                catch (NullReferenceException excpt)
                {   
                    
                }
            }

            if (_capture != null) //if camera capture has been successfully created
            {
                
            }
        }
        
    }
}