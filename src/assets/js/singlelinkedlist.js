
    /*  LinkedList
     *  Description:  single linked list implimentation 
     */ 
function LinkedList() {
	this.head = null;
}

LinkedList.prototype = {
	/*  LinkedList.add(value)
     *  Description:  adds a node to the list of value, then points/links it in list
     * 		@param - a value to add to the linked list
     * 		@return node - returns the next node in the list
     */ 
	add: function(value) {
		var node = {
			value: value,
			next: null };
		var current;
		if(this.head === null){
			this.head = node;
		} else {
			current = this.head;
			while(current.next) {
				current = current.next;
			}
			current.next = node;
		}
		return node;
	},
	/*  LinkedList.remove(node)
     *  Description:  removes node from list, and then sets the current to point/link to the next node in linked list
     * 		@param node- a node to remove from the list
     * 		@return value - the value of the node removed from the list
     */ 
	remove: function(node) {
		var current;
		var value = node.value;
		if(this.head !== null) {
			this.head = this.head.next;
			node.next = null;
			return value;
		}
		current = this.head;
		while(current.next) {
			if(current.next === node) {
				current.next = node.next;
				return value;
			}
			current = current.next;
		}
	}
}
