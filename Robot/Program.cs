using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Robot
{
    class Program
    {
        
        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                Helper.Env = args[0];
            }

            Console.WriteLine($"Starting Mechi for {Helper.Env}!");
            Speaker.Say("ikheblekkergeslapen");

            var speaker = Speaker.HandleAllTalk();
            var seeer = Seeer.HandleCapture();
            Task.WaitAll(speaker, seeer);
        }       
        
    }
}
