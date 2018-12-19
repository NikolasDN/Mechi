using System.Collections;
using System.Threading.Tasks;

namespace Robot
{
    public class Speaker
    {
        private static Queue _talk = new Queue();
        public async static Task HandleAllTalk()
        {            
            while(true)
            {
                while(_talk.Count > 0)
                {
                    var toSay = _talk.Dequeue();
                    Talk(toSay.ToString());                    
                }

                await Task.Delay(500);
            }
        }

        public static void Say(string toSay)
        {
            _talk.Enqueue(toSay);
        }

        private static void Talk(string toSay)
        {
            if (Helper.Env == "pi")
            {
                Helper.Cmd("omxplayer", $"sentences/{toSay}.mp3");
            }
            else
            {
                Helper.Cmd("mpg123", $"sentences/{toSay}.mp3");
            }
        }
    }
}