/**
 * Created by taushifhabiboellah on 05/06/14.
 */
function sync_loop(i, iterations, process, exit)
{
    var index = i,
        done = false,
        shouldExit = false;

    var loop = {
        next : function()
        {
            if(done)
            {
                if(shouldExit && exit)
                {
                    exit(); // Exit if we're done
                }

                return; // Stop the loop if we're done
            }
            // If we're not finished
            if(index < iterations)
            {
                index++; // Increment our index
                process(loop); // Run our process, pass in the loop
                // Otherwise we're done
            }
            else
            {
                done = true; // Make sure we say we're done
                if(exit) exit(index); // Call the callback on exit
            }
        },
        iteration:function()
        {
            return index - 1; // Return the loop number we're on
        },
        break:function(end)
        {
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };

    loop.next();

    return loop;
};