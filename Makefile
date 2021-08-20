CC = emcc
EXPORT_FUNCTIONS = ['_increment','_decrement']
CFLAGS = -s SIDE_MODULE=2 -O2 -s EXPORTED_FUNCTIONS=$(EXPORT_FUNCTIONS)
TARGET = side_module.wasm

$(TARGET): increment.c
	$(CC) increment.c $(CFLAGS) -o $@

clean :
	rm *.wasm