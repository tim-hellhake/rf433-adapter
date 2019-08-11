# Compile for Raspberry Pi
CXXFLAGS=-DRPI

all: sniffer
	
sniffer: ../rc-switch/RCSwitch.o sniffer.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt

clean:
	$(RM) ../rc-switch/*.o *.o sniffer
