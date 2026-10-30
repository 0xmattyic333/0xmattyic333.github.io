// The fake z/OS session the hero terminal plays. Edit the lines to change the demo.
// tone picks the color; typed: true means the line is typed out letter by letter
// (like a person entering a command) instead of appearing all at once.
export type TerminalLine = {
  text: string
  tone: 'prompt' | 'input' | 'jcl' | 'output' | 'success'
  typed?: boolean
}

export const terminalScript: TerminalLine[] = [
  { text: 'READY', tone: 'prompt' },
  { text: "submit 'MATT.JCL(HELLO)'", tone: 'input', typed: true },
  { text: "//HELLO    JOB  (ACCT),'MATTHEW',CLASS=A", tone: 'jcl' },
  { text: '//STEP1    EXEC PGM=HELLOCOB', tone: 'jcl' },
  { text: '//SYSOUT   DD   SYSOUT=*', tone: 'jcl' },
  { text: 'IKJ56250I JOB HELLO(JOB04213) SUBMITTED', tone: 'output' },
  { text: '$HASP165 HELLO ENDED AT N1 - MAXCC=0000', tone: 'success' },
  { text: 'HELLO FROM COBOL. I SPEAK MAINFRAME.', tone: 'success' },
  { text: 'READY', tone: 'prompt' },
]
