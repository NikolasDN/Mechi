using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using HtmlAgilityPack;

namespace SpeechGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting SpeechGenerator");

            var linesToRead = ReadNewspaper();

            // while(true)
            // {
            foreach(var line in linesToRead)
            {
                Speak(line);
                Thread.Sleep(2000);
            }              
                
            //}

            //Console.WriteLine("SpeechGenerator stopped");
        }

        static List<string> ReadNewspaper()
        {
            List<string> result = new List<string>();
            // HttpClient httpClient = new HttpClient();
            // string html = httpClient.GetStringAsync("http://www.standaard.be/").GetAwaiter().GetResult();
            // XmlDocument doc = new XmlDocument();
            // doc.LoadXml(html);
            // XmlNodeList elemList = doc.GetElementsByTagName("article");
            // for (int i = 0; i < elemList.Count; i++)
            // {
            //     result.Add(elemList[i].Attributes["data-vr-contentbox"].Value);
            // }
            var html = @"http://www.standaard.be/";
            HtmlWeb web = new HtmlWeb();
            var htmlDoc = web.Load(html);
            var nodes = htmlDoc.DocumentNode.Descendants("article");
            foreach(var node in nodes)
            {
                result.Add(node.GetAttributeValue("data-vr-contentbox", ""));
            }
            
            return result;
        }

        static void Speak(string text)
        {
            text = RemoveSpecialCharacters(text);

            Cmd("espeak", $"-a 200 -p 50 -vnl+m1 \"{text}\"");
        }

        static string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))
                {
                    sb.Append(c);
                }
                else
                {
                    sb.Append(" ");
                }
            }
            return sb.ToString();
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
