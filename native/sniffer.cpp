#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "../rc-switch/RCSwitch.h"

int main(int argc, char *argv[])
{
  if (wiringPiSetup() == -1)
  {
    printf("wiringPiSetup failed, exiting...");
    return 0;
  }

  RCSwitch mySwitch = RCSwitch();
  mySwitch.enableReceive(2);

  while (1)
  {
    if (mySwitch.available())
    {
      int value = mySwitch.getReceivedValue();
      printf("%i\n", value);
      fflush(stdout);
      mySwitch.resetAvailable();
    }

    usleep(100);
  }
}
