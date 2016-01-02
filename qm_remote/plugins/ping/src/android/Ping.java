package ping;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import java.io.IOException;
import java.net.URL;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import android.os.AsyncTask;

public class Ping extends CordovaPlugin
{
	ConnectivityManager cm;
	CallbackContext ctx;
	int timeout;

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArray of arguments for the plugin.
     * @param callbackContext   The callback context used when calling back into JavaScript.
     * @return                  True when the action was valid, false otherwise.
     */
	@Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException
	{
		ctx = callbackContext;

		if (action.equals("ping"))
		{
			cm = (ConnectivityManager) this.cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
			
			timeout = args.getInt(1);

            new PingTask().execute(args.getString(0));
			
			return true;
        }

        return false;
    }

	private class PingTask extends AsyncTask<String, Void, Boolean>
	{
        @Override
        protected Boolean doInBackground(String... urls)
		{
			NetworkInfo netInfo = cm.getActiveNetworkInfo();

			if (netInfo != null && netInfo.isConnected())
			{
				try
				{
					// Change to "http://google.com" for www  test.
					URL url = new URL(urls[0]);
					HttpURLConnection urlc = (HttpURLConnection) url.openConnection();
					urlc.setConnectTimeout(timeout);
					urlc.connect();
					// 200 = "OK" code (http connection is fine).
					if (urlc.getResponseCode() == 200)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				catch (MalformedURLException ue)
				{
					return false;
				}
				catch (IOException e)
				{
					return false;
				}
			}

			return false;
        }
		
        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(Boolean isOnline)
		{
            ctx.success(isOnline ? 1 : 0);
       	}
    }
}
