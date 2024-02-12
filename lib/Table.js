
function format(results_arr) {

    function get_widths_arr(results_arr){
        let length_arr = [];
        for(var i=0;i<results_arr.length;i++) {
            let j_g = 0;
            var j = 0;
            while(j_g == 0) {
                let row_o = results_arr[i];
                let value = Object.values(row_o)[j];
                if (value == undefined) {
                    j_g = 1;
                    break
                } else {
                    let length_n = value.toString().length;
                    length_arr.push(length_n);
                }
                j++;
            }
        }
        return [length_arr,j];
    }
    
    function get_widths_max_arr() {
        var widths_arr = get_widths_arr(results_arr);
        let lengths_all_arr = widths_arr[0];
        let cols_n = widths_arr[1];
        var max_withs_arr = [];
        for (let j = 0; j<cols_n; j++) {
            var max_col_with_n = 0;
            for (i=j;i<lengths_all_arr.length;i+=cols_n) {
                var width_n = lengths_all_arr[i];
                if (width_n > max_col_with_n) {
                    max_col_with_n = width_n;
                }
            }
            max_withs_arr.push(max_col_with_n);
        }
        return max_withs_arr;
    }

    let maximum_width_arr = get_widths_max_arr();
    console.log(maximum_width_arr);


    let formatted_array = [];
    return formatted_array;
}

function test() {

    let test_arr = [
        {
            id: 1,
            name: 'Engineering',
            testy: '12345',
        },
        {
            id: 2,
            name: 'Finance',
            testy: '1234',
        },
        {
            id: 3,
            name: 'Legal',
            testy: '123',
        },
        {
            id: 4,
            name: 'Sales',
            testy: '1234567',
        },
        {
            id: 5,
            name: 'Service',
            testy: '12',
        },
    ];

    format(test_arr);
};

test();


module.exports = { format };