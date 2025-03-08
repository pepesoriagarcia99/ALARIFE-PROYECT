function generateLoad(): void {
    console.log('pid:', process.pid);

    let data: number[][] = [];
    const addLoad = () => {
        const blockSize = 1e6;
        const newBlock: number[] = new Array(blockSize).fill(0).map(() => Math.random());
        data.push(newBlock);
    };

    const resetLoad = () => {
        console.log("Reiniciando carga de memoria");
        console.log('pid:', process.pid);
        

        data = [];
    };

    setInterval(addLoad, 1000);
    setInterval(resetLoad, 60000);
}

generateLoad();

console.log('pid:', process.pid);
