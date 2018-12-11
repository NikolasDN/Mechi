using System;
using System.Diagnostics;
using System.Threading;

namespace SpeechGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting SpeechGenerator");

            while(true)
            {
                Cmd("espeak", "-a 200 -p 50 -vnl+m1 \"Ik heb lekker geslapen\"");

                Thread.Sleep(100);
            }

            Console.WriteLine("SpeechGenerator stopped");
        }

        static string Cmd(string cmd, string arguments)
        {
            var escapedArgs = cmd.Replace("\"", "\\\"");

            var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = cmd,
                    Arguments = arguments,
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
