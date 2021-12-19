function* indexGenerator() {
    let index = 0;
    while (true) {
        yield index;
        index++;
    }
}

export default indexGenerator();