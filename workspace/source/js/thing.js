/** 
	
	## Steps to reproduce
	
	1. uncomment line #11 (to trigger an error)
	2. comment line #11 (to fix)
	3. uncomment line #12 (to show it's ok)
**/

const some = {}
// trigger_the_error
// alert('Everything should be ok now!')

export default some;
