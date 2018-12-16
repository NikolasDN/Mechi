using System;
using System.Diagnostics;

namespace Robot
{
    class Program
    {
        static string env = "pi";
        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                env = args[0];
            }

            Console.WriteLine("Hello Mechi!");
            Say("goeieavond");
            Say("soeshi");
        }

        static void Say(string toSay)
        {
            if (env == "pi")
            {
                Cmd("omxplayer", $"sentences/{toSay}.mp3");
            }
            else
            {
                Cmd("mpg123", $"sentences/{toSay}.mp3");
            }
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
