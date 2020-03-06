export enum OpCode {
  PUSHINT8 = "00",
  PUSHINT16 = "01",
  PUSHINT32 = "02",
  PUSHINT64 = "03",
  PUSHINT128 = "05",
  PUSHINT256 = "06",
  PUSHA = "0a",
  PUSHNULL = "0b",
  PUSHDATA1 = "0c",
  PUSHDATA2 = "0d",
  PUSHDATA4 = "0e",
  PUSHM1 = "0f",
  PUSH0 = "10",
  PUSH1 = "11",
  PUSH2 = "12",
  PUSH3 = "13",
  PUSH4 = "14",
  PUSH5 = "15",
  PUSH6 = "16",
  PUSH7 = "17",
  PUSH8 = "18",
  PUSH9 = "19",
  PUSH10 = "1a",
  PUSH11 = "1b",
  PUSH12 = "1c",
  PUSH13 = "1d",
  PUSH14 = "1e",
  PUSH15 = "1f",
  PUSH16 = "20",
  NOP = "21",
  JMP = "22",
  JMP_L = "23",
  JMPIF = "24",
  JMPIF_L = "25",
  JMPIFNOT = "26",
  JMPIFNOT_L ="27",
  JMPEQ = "28",
  JMPEQ_L = "29",
  JMPNE = "2a",
  JMPNE_L = "2b",
  JMPGT = "2c",
  JMPGT_L = "2d",
  JMPGE = "2e",
  JMPGE_L = "2f",
  JMPLT = "30",
  JMPLT_L = "31",
  JMPLE = "32",
  JMPLE_L = "33",
  CALL = "34",
  CALL_L = "35",
  CALLA = "36",
  THROW = "37",
  THROWIF = "38",
  THROWIFNOT = "39",
  RET = "40",
  SYSCALL = "41",
  DEPTH = "43",
  DROP = "45",
  NIP = "46",
  XDROP = "48",
  CLEAR = "49",
  DUP = "4a",
  OVER = "4b",
  PICK = "4d",
  TUCK = "4e",
  SWAP = "50",
  ROT = "51",
  ROLL = "52",
  REVERSE3 = "53",
  REVERSE4 = "54",
  REVERSEN = "55",
  INITSSLOT = "56",
  INITSLOT = "57",
  LDSFLD0 = "58",
  LDSFLD1 = "59",
  LDSFLD2 = "5a",
  LDSFLD3 = "5b",
  LDSFLD4 = "5c",
  LDSFLD5 = "5d",
  LDSFLD6 = "5e",
  LDSFLD = "5f",
  STSFLD0 = "60",
  STSFLD1 = "61",
  STSFLD2 = "62",
  STSFLD3 = "63",
  STSFLD4 = "64",
  STSFLD5 = "65",
  STSFLD6 = "66",
  STSFLD = "67",
  LDLOC0 = "68",
  LDLOC1 = "69",
  LDLOC2 = "6a",
  LDLOC3 = "6b",
  LDLOC4 = "6c",
  LDLOC5 = "6d",
  LDLOC6 = "6e",
  LDLOC = "6f",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 0.
  /// </summary>
  STLOC0 = "70",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 1.
  /// </summary>
  STLOC1 = "71",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 2.
  /// </summary>
  STLOC2 = "72",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 3.
  /// </summary>
  STLOC3 = "73",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 4.
  /// </summary>
  STLOC4 = "74",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 5.
  /// </summary>
  STLOC5 = "75",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at index 6.
  /// </summary>
  STLOC6 = "76",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the local variable list at a specified index. The index is represented as a 1-byte unsigned integer.
  /// </summary>
  STLOC = "77",
  /// <summary>
  /// Loads the argument at index 0 onto the evaluation stack.
  /// </summary>
  LDARG0 = "78",
  /// <summary>
  /// Loads the argument at index 1 onto the evaluation stack.
  /// </summary>
  LDARG1 = "79",
  /// <summary>
  /// Loads the argument at index 2 onto the evaluation stack.
  /// </summary>
  LDARG2 = "7a",
  /// <summary>
  /// Loads the argument at index 3 onto the evaluation stack.
  /// </summary>
  LDARG3 = "7b",
  /// <summary>
  /// Loads the argument at index 4 onto the evaluation stack.
  /// </summary>
  LDARG4 = "7c",
  /// <summary>
  /// Loads the argument at index 5 onto the evaluation stack.
  /// </summary>
  LDARG5 = "7d",
  /// <summary>
  /// Loads the argument at index 6 onto the evaluation stack.
  /// </summary>
  LDARG6 = "7e",
  /// <summary>
  /// Loads the argument at a specified index onto the evaluation stack. The index is represented as a 1-byte unsigned integer.
  /// </summary>
  LDARG = "7f",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 0.
  /// </summary>
  STARG0 = "80",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 1.
  /// </summary>
  STARG1 = "81",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 2.
  /// </summary>
  STARG2 = "82",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 3.
  /// </summary>
  STARG3 = "83",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 4.
  /// </summary>
  STARG4 = "84",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 5.
  /// </summary>
  STARG5 = "85",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at index 6.
  /// </summary>
  STARG6 = "86",
  /// <summary>
  /// Stores the value on top of the evaluation stack in the argument slot at a specified index. The index is represented as a 1-byte unsigned integer.
  /// </summary>
  STARG = "87",
  NEWBUFFER = "88",
  MEMCPY = "89",
  /// <summary>
  /// Concatenates two strings.
  /// </summary>
  CAT = "8b",
  /// <summary>
  /// Returns a section of a string.
  /// </summary>
  SUBSTR = "8c",
  /// <summary>
  /// Keeps only characters left of the specified point in a string.
  /// </summary>
  LEFT = "8d",
  /// <summary>
  /// Keeps only characters right of the specified point in a string.
  /// </summary>
  RIGHT = "8e",
  /// <summary>
  /// Flips all of the bits in the input.
  /// </summary>
  INVERT = "90",
  /// <summary>
  /// Boolean and between each bit in the inputs.
  /// </summary>
  AND = "91",
  /// <summary>
  /// Boolean or between each bit in the inputs.
  /// </summary>
  OR = "92",
  /// <summary>
  /// Boolean exclusive or between each bit in the inputs.
  /// </summary>
  XOR = "93",
  /// <summary>
  /// Returns 1 if the inputs are exactly equal", 0 otherwise.
  /// </summary>
  EQUAL = "97",
  /// <summary>
  /// Returns 1 if the inputs are not equal", 0 otherwise.
  /// </summary>
  NOTEQUAL = "98",
  /// <summary>
  /// Puts the sign of top stack item on top of the main stack. If value is negative", put -1; if positive", put 1; if value is zero", put 0.
  /// </summary>
  SIGN = "99",
  /// <summary>
  /// The input is made positive.
  /// </summary>
  ABS = "9a",
  /// <summary>
  /// The sign of the input is flipped.
  /// </summary>
  NEGATE = "9b",
  /// <summary>
  /// 1 is added to the input.
  /// </summary>
  INC = "9c",
  /// <summary>
  /// 1 is subtracted from the input.
  /// </summary>
  DEC = "9d",
  /// <summary>
  /// a is added to b.
  /// </summary>
  ADD = "9e",
  /// <summary>
  /// b is subtracted from a.
  /// </summary>
  SUB = "9f",
  /// <summary>
  /// a is multiplied by b.
  /// </summary>
  MUL = "a0",
  /// <summary>
  /// a is divided by b.
  /// </summary>
  DIV = "a1",
  /// <summary>
  /// Returns the remainder after dividing a by b.
  /// </summary>
  MOD = "a2",
  /// <summary>
  /// Shifts a left b bits", preserving sign.
  /// </summary>
  SHL = "a8",
  /// <summary>
  /// Shifts a right b bits", preserving sign.
  /// </summary>
  SHR = "a9",
  /// <summary>
  /// If the input is 0 or 1", it is flipped. Otherwise the output will be 0.
  /// </summary>
  NOT = "aa",
  /// <summary>
  /// If both a and b are not 0", the output is 1. Otherwise 0.
  /// </summary>
  BOOLAND = "ab",
  /// <summary>
  /// If a or b is not 0", the output is 1. Otherwise 0.
  /// </summary>
  BOOLOR = "ac",
  /// <summary>
  /// Returns 0 if the input is 0. 1 otherwise.
  /// </summary>
  NZ = "b1",
  /// <summary>
  /// Returns 1 if the numbers are equal", 0 otherwise.
  /// </summary>
  NUMEQUAL = "b3",
  /// <summary>
  /// Returns 1 if the numbers are not equal", 0 otherwise.
  /// </summary>
  NUMNOTEQUAL = "b4",
  /// <summary>
  /// Returns 1 if a is less than b", 0 otherwise.
  /// </summary>
  LT = "b5",
  /// <summary>
  /// Returns 1 if a is less than or equal to b", 0 otherwise.
  /// </summary>
  LE = "b6",
  /// <summary>
  /// Returns 1 if a is greater than b", 0 otherwise.
  /// </summary>
  GT = "b7",
  /// <summary>
  /// Returns 1 if a is greater than or equal to b", 0 otherwise.
  /// </summary>
  GE = "b8",
  /// <summary>
  /// Returns the smaller of a and b.
  /// </summary>
  MIN = "b9",
  /// <summary>
  /// Returns the larger of a and b.
  /// </summary>
  MAX = "ba",
  /// <summary>
  /// Returns 1 if x is within the specified range (left-inclusive)", 0 otherwise.
  /// </summary>
  WITHIN = "bb",
  /// <summary>
  /// A value n is taken from top of main stack. The next n items on main stack are removed", put inside n-sized array and this array is put on top of the main stack.
  /// </summary>
  PACK = "c0",
  /// <summary>
  /// An array is removed from top of the main stack. Its elements are put on top of the main stack (in reverse order) and the array size is also put on main stack.
  /// </summary>
  UNPACK = "c1",
  /// <summary>
  /// An empty array (with size 0) is put on top of the main stack.
  /// </summary>
  NEWARRAY0 = "c2",
  /// <summary>
  /// A value n is taken from top of main stack. A null-filled array with size n is put on top of the main stack.
  /// </summary>
  NEWARRAY = "c3",
  /// <summary>
  /// A value n is taken from top of main stack. An array of type T with size n is put on top of the main stack.
  /// </summary>
  NEWARRAY_T = "c4",
  /// <summary>
  /// An empty struct (with size 0) is put on top of the main stack.
  /// </summary>
  NEWSTRUCT0 = "c5",
  /// <summary>
  /// A value n is taken from top of main stack. A zero-filled struct with size n is put on top of the main stack.
  /// </summary>
  NEWSTRUCT = "c6",
  /// <summary>
  /// A Map is created and put on top of the main stack.
  /// </summary>
  NEWMAP = "c8",
  /// <summary>
  /// An array is removed from top of the main stack. Its size is put on top of the main stack.
  /// </summary>
  SIZE = "ca",
  /// <summary>
  /// An input index n (or key) and an array (or map) are removed from the top of the main stack. Puts True on top of main stack if array[n] (or map[n]) exist", and False otherwise.
  /// </summary>
  HASKEY = "cb",
  /// <summary>
  /// A map is taken from top of the main stack. The keys of this map are put on top of the main stack.
  /// </summary>
  KEYS = "cc",
  /// <summary>
  /// A map is taken from top of the main stack. The values of this map are put on top of the main stack.
  /// </summary>
  VALUES = "cd",
  /// <summary>
  /// An input index n (or key) and an array (or map) are taken from main stack. Element array[n] (or map[n]) is put on top of the main stack.
  /// </summary>
  PICKITEM = "ce",
  /// <summary>
  /// The item on top of main stack is removed and appended to the second item on top of the main stack.
  /// </summary>
  APPEND = "cf",
  /// <summary>
  /// A value v", index n (or key) and an array (or map) are taken from main stack. Attribution array[n]=v (or map[n]=v) is performed.
  /// </summary>
  SETITEM = "d0",
  /// <summary>
  /// An array is removed from the top of the main stack and its elements are reversed.
  /// </summary>
  REVERSEITEMS = "d1",
  /// <summary>
  /// An input index n (or key) and an array (or map) are removed from the top of the main stack. Element array[n] (or map[n]) is removed.
  /// </summary>
  REMOVE = "d2",
  /// <summary>
  /// Remove all the items from the compound-type.
  /// </summary>
  CLEARITEMS = "d3",
  /// <summary>
  /// Returns true if the input is null. Returns false otherwise.
  /// </summary>
  ISNULL = "d8",
  /// <summary>
  /// Returns true if the top item is of the specified type.
  /// </summary>
  ISTYPE = "d9",
  /// <summary>
  /// Converts the top item to the specified type.
  /// </summary>
  CONVERT = "db",
}

export default OpCode;
