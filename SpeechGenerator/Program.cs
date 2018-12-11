using System;
using System.Diagnostics;

namespace SpeechGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting SpeechGenerator");

            Cmd("espeak.exe -a 200 -p 50 -vnl+m1 \"Mmm, ik heb lekker geslapen\"");

            Console.WriteLine("SpeechGenerator stopped");
        }

        static string Cmd(string cmd)
        {
            var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = cmd,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
            try
            {
                process.Start();
                string result = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return result;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            return "";
        }
    }
}
