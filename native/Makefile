# Compile for Raspberry Pi
CXXFLAGS=-DRPI

all: sniffer
	
sniffer: ../rc-switch/RCSwitch.o sniffer.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $(EXTRA_CFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt -lrt

clean:
	$(RM) ../rc-switch/*.o *.o sniffer
