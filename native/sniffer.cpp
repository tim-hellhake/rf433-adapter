#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <time.h>
#include "../rc-switch/RCSwitch.h"

#define __DEBOUNCE_TIMESPAN_S__ 0.5d // Debounce duration in seconds (double)

struct timespec previous_timestamp;
int previous_value = -1;

double get_time_diff(timespec past_date)
{
  double elapsed_s;
  struct timespec now_date;
  clock_gettime(CLOCK_MONOTONIC, &now_date);
  elapsed_s = (now_date.tv_sec - past_date.tv_sec);
  elapsed_s += (now_date.tv_nsec - past_date.tv_nsec) / 1000000000.0;
  return elapsed_s;
}

int main(int argc, char *argv[])
{
  if (wiringPiSetup() == -1)
  {
    printf("wiringPiSetup failed, exiting...");
    return 0;
  }

  RCSwitch mySwitch = RCSwitch();
  mySwitch.enableReceive(2);

  // Sets 'previous_timestamp' to current time
  clock_gettime(CLOCK_MONOTONIC, &previous_timestamp);

  while (1)
  {
    if (mySwitch.available())
    {
      int value = mySwitch.getReceivedValue();

      // Checks if debounce timer is elapsed or if the recieved value is a new one
      if (get_time_diff(previous_timestamp) > __DEBOUNCE_TIMESPAN_S__ || previous_value != value)
      {
        printf("%i\n", value);
        fflush(stdout);
        previous_value = value;
      }

      mySwitch.resetAvailable();

      // Resets the debounce timer
      clock_gettime(CLOCK_MONOTONIC, &previous_timestamp);
    }

    usleep(100);
  }
}
